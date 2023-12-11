---
layout: project
author: hanbo
title: "RSSI-based Hidden Camera Localizer"
date: 2023-11-02 11:05:00 -0500
tags: [uiuc-mp, iot]
---

<style>
figure {
  padding: 4px;
  margin: auto;
}

figcaption {
  color: gray;
  font-style: italic;
  padding: 2px;
  text-align: center;
}

</style>

With given camera MAC address and channel information, localize a hidden camera in an unfamiliar environment.

<small> Existing works proposed reliable method for obtaining MAC address and channel information. More on [this paper](https://www.usenix.org/system/files/sec22-sharma-rahul.pdf)</small>

<details>
  <summary>
    Background knownledge just in case
    <span class="icon">👇</span>
  </summary>
  <ul>
    <li>RSSI: received signal strength indicator. Available in Wi-Fi radio packet header. Stronger the Wi-Fi signal, higher the RSSI. </li>
    <li>Hidden camera: usually streaming packets when motion is detected -> high RSSI values</li>
    <li>RSSI is very coarse: reflections from other objects might interfer with rssi readings</li>
  </ul>
</details>

### **Experiment Setup**

Equipment:
* Raspberry Pi 4 with Wi-Fi dungle and SenseHat
* Hidden camera: same Rpi4, transmitting packets when **motion is detected**

Environment:
* Office setup (desks, tables, TV, office supplies, ...)
* No *walking*, only *sitting*

<figure>
  <img src="/assets/img/projects/rssi/environment.png" alt="Trulli" style="width:100%">
  <figcaption>Experiment environment</figcaption>
</figure>

Known information:
* Camera's MAC address
* Camera channel number
* Unprivilleged access to Wi-Fi

<figure>
  <img src="/assets/img/projects/rssi/experiment_setup.jpg" alt="Trulli" style="width:100%">
  <figcaption>Known information before experiment</figcaption>
</figure>

Experiment specific setup:
* Data collection for **1 minute**
* Data analysis after data collection (postprocessing only)


### **Methodology**

* Data: IMU raw data + RSSI data
* Positioning: Joystick orientation + IMU Step Detection
* Localization: spatial interpolated max RSSI

<figure>
  <img src="/assets/img/projects/rssi/overview.png" alt="Trulli" style="width:100%">
  <figcaption>System Overview: real-time collection + post-processing</figcaption>
</figure>

The *Real-Time Component* is running real-time when exploring in the unfamiliar environment

The *Post-processing Module* and *Localization Module* run seperatively after data collection is completed.

#### Data Collection

* RSSI: We run a packet sniffer on the Raspberry Pi, collecting only packets from the known camera's MAC address. 
* IMU: real-time IMU data
* Orientation: pull joystick when turning (so only 90 or 180 degree turning)


#### Step Detection

Uses IMU acceleration data (all xyz axis), plus a Butterworth filter, plus `find_peaks` from scipy. Then linearly interpolate step magnitudes (acceleration magnitude) to step sizes:
> A 1.2m step has higher acceleration peak compared to a 0.3m step

<figure>
  <img src="/assets/img/projects/rssi/steps.png" alt="Trulli" style="width:100%">
  <figcaption>Steps with their magnitude</figcaption>
</figure>

#### IMU-RSSI-Step Fusion

Steps + orientation gives coarse routes in the room. Some other IMU-Step fusion and interpolation are used to fill the voids between each steps. See our [report](https://drive.google.com/file/d/1VsGQ1eGaHJxZhUUWjyOTj2XSeIm56rKE/view?usp=sharing) for more details.

<figure>
  <center><img src="/assets/img/projects/rssi/data.png" alt="Trulli" style="width:100%"></center>
  <figcaption>IMU-based positioning with RSSI for spatial interpolation</figcaption>
</figure>

We assign RSSI values to each positioning coordinate (x, y). Then we use spatial interpolation on coordinates. 

#### Localization

Intuition tells the hidden camera is on the middle right of the room, which it is!

We use a combination of three methods:

* **Max RSSI**: take the point with maximum RSSI value
* **Grid RSSI**: grid-based max rssi, take the grid with maximum average RSSI
* **Spatial RSSI**: spatial interpolation + curve fit, find max

<figure>
  <center><img src="/assets/img/projects/rssi/localization.png" alt="Trulli" style="width:80%"></center>
  <figcaption>Localization result</figcaption>
</figure>

The true label is very close to *max rssi* label. In case when there is no line-of-sight between the camera and the receiver, *spatial rssi* is more accurate because it takes into account the spatial distribution of RSSI values.

### Experiment Result

In an office setup (around 4m * 8m), we achieved **< 2m** localization error. This is still useful in finding hidden cameras in real-world scenarios. Also note that we only have **1 minute** of data collection, which in real-world scenarios, we can collect data for longer time and achieve better results.