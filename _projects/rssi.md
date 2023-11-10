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
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.collapsible:after {
  content: '\002B';
  color: white;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}
</style>
<script>
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
</script>

With given camera MAC address and channel information, localize a hidden camera in an unfamiliar environment.

<small> Existing works proposed reliable method for obtaining MAC address and channel information. More on [this paper](https://www.usenix.org/system/files/sec22-sharma-rahul.pdf)</small>

<button class="collapsible">Background knownledge just in case</button>
<div class="content">
  <ul>
    <li>RSSI: received signal strength indicator. Available in Wi-Fi radio packet header. Stronger the Wi-Fi signal, higher the RSSI. </li>
  </ul>
</div>

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


#### Step Detection

Uses IMU acceleration data (all xyz axis), plus a Butterworth filter, plus `find_peaks`. Then linearly interpolate step magnitudes (acceleration magnitude) to step sizes:
> A 1.2m step has higher acceleration peak compared to a 0.3m step

<figure>
  <img src="/assets/img/projects/rssi/steps.png" alt="Trulli" style="width:100%">
  <figcaption>Steps with their magnitude</figcaption>
</figure>

#### IMU-RSSI-Step Fusion

Steps + orientation gives coarse routes in the room. Some other IMU-Step fusion and interpolation are used to fill the voids between each steps. See our [report](https://drive.google.com/file/d/1VsGQ1eGaHJxZhUUWjyOTj2XSeIm56rKE/view?usp=sharing) for more details.

<figure>
  <img src="/assets/img/projects/rssi/data.png" alt="Trulli" style="width:100%">
  <figcaption>IMU-based positioning with RSSI for spatial interpolation</figcaption>
</figure>

We assign RSSI values to each positioning coordinate (x, y). Then we use spatial interpolation on coordinates. 

#### Localization

Intuition tells the hidden camera is on the middle right of the room.