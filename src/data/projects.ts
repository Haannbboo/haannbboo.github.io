export interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
  github?: string;
  reportUrl?: string;
  pypiUrl?: string;
  content: string;
  featured: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "esi_requests",
    title: "esi_requests: requests-style API for EVE-Online",
    summary: "Python API wrapper for EVE-Online's ESI API featuring asyncio support, automatic caching, OAuth2 SSO, and ETag compliance.",
    tags: ["python", "eve-online", "asyncio", "data", "pypi"],
    github: "https://github.com/evetools-dev/esi_requests",
    pypiUrl: "https://pypi.org/project/esi-requests/",
    featured: true,
    content: `
# What is esi_requests?

**esi_requests** wraps EVE-Online's [ESI API](https://esi.evetech.net/ui/) with **requests** style methods:

\`\`\`python
import esi_requests

r = esi_requests.get("/markets/{region_id}/orders/", region_id=10000002, type_id=1403)
print(r.status)  # 200
print(r.json())  # {[{'duration': 90, 'is_buy_order': False, ...}
\`\`\`

With **asyncio** enabled and simplified:

\`\`\`python
import esi_requests

resps = esi_requests.get("/markets/{region_id}/orders/", region_id=10000002, type_id=[1403, 12005, 626])
print(resps)  # [<Response [200]>, <Response [200]>, <Response [200]>]
\`\`\`

which internally uses *aiohttp* to send requests asynchronously.

# Key Features

* **One-line async enabled**: No need to master *aiohttp* or complex *asyncio* event loops.
* **Simple requests API**: Intuitive syntax matching standard Python requests.
* **Simplified OAuth2 SSO**: Simple authentication flow for account access.
* **ETag Header Support**: Compliant with ESI rate-limit and caching recommendations.
`
  },
  {
    id: "rssi",
    title: "RSSI-based Hidden Camera Localizer",
    summary: "Indoor position tracking system with Step-Acceleration fusion, IMU-RSSI fusion, and spatial interpolation achieving <2m localization accuracy.",
    tags: ["iot", "sensors", "uiuc", "python", "scipy"],
    image: "/assets/img/projects/rssi/overview.png",
    reportUrl: "https://drive.google.com/file/d/1VsGQ1eGaHJxZhUUWjyOTj2XSeIm56rKE/view?usp=sharing",
    featured: true,
    content: `
# RSSI-based Hidden Camera Localizer

Given a hidden camera's MAC address and channel information, this project localizes hidden cameras in unfamiliar indoor environments using Wi-Fi RSSI signals and IMU step detection.

### Experiment Setup
* **Hardware**: Raspberry Pi 4 with Wi-Fi dongle and SenseHat.
* **Hidden Camera**: Streaming video packets upon motion detection.
* **Environment**: Office setup with furniture, desks, and obstacles.

### Methodology
1. **Real-time Data Collection**: Packet sniffer filtering target MAC address + continuous IMU acceleration/joystick orientation data.
2. **Step Detection**: Butterworth filter + SciPy peak detection on IMU acceleration data with step-magnitude linear interpolation.
3. **IMU-RSSI Fusion**: Position tracking combined with RSSI mapping.
4. **Spatial Interpolation & Localization**:
   * *Max RSSI*: Identifies absolute maximum signal strength point.
   * *Grid RSSI*: Grid-averaged maximum RSSI.
   * *Spatial RSSI*: 2D curve fitting and spatial interpolation.

### Results
Achieved **< 2m localization error** in a 4m x 8m office space with only **1 minute** of data collection.
`
  },
  {
    id: "idunno",
    title: "Idunno: Distributed Inferencer",
    summary: "Fault-tolerant distributed ML inference engine featuring ring group membership, distributed storage, and task scheduling.",
    tags: ["distributed-systems", "python", "fault-tolerance", "uiuc"],
    image: "/assets/img/projects/idunno_system.jpg",
    github: "https://github.com/Haannbboo/cs425-fa22-archive",
    featured: true,
    content: `
# Idunno: Distributed Inferencer

Idunno is a fault-tolerant, scalable distributed inference framework designed inspired by the architecture of Ray.

### Architecture Highlights
* **Fault Tolerance**: Sustains up to 30% simultaneous worker node failures before system convergence.
* **Group Membership**: Ring-based heartbeat and failure detection.
* **Distributed File System**: Shared artifact storage across inference nodes.
* **Inference Scheduler**: Dynamic job assignment to active worker nodes.

### Usage
\`\`\`bash
# Start client
python3 idunno.py client

# Inference commands
train model_name
upload input_directory [file_cnt]
inference model_name data_dir
\`\`\`
`
  }
];
