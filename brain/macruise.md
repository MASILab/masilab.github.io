---
title: MaCRUISE
parent: Brain
layout: gallery-item
summary: Consistent cortical reconstruction and multi-atlas brain segmentation
image: /assets/images/brain/macruise.jpg
repo: https://github.com/MASILab/MaCRUISE
license: "BSD 3-Clause License"
---

{: .note}
MaCRUISE is the multi-atlas predecessor of [SLANT](/brain/slant) and [UNesT](/brain/unest); it pairs multi-atlas segmentation with cortical surface reconstruction.

MaCRUISE segments a T1 MRI scan to 133 labels while simultaneously reconstructing consistent cortical surfaces. The whole workflow ships as a single Docker image (about 10 GB) and runs in two steps: SLANT whole brain segmentation, followed by MaCRUISE surface reconstruction.

## Usage

```bash
# Get the MaCRUISE docker image
sudo docker pull masidocker/spiders:MaCRUISE_v3_1_0

# Step 1: run SLANT whole brain segmentation
sudo nvidia-docker run -it --rm \
    -v $SLANT_input_dir:/INPUTS/ \
    -v $SLANT_output_dir:/OUTPUTS \
    masidocker/spiders:deep_brain_seg_v1_0_0 \
    /extra/run_deep_brain_seg.sh

# Step 2: run MaCRUISE surface reconstruction
sudo docker run --rm \
    -v $MaCRUISE_input_dir:/INPUTS/ \
    -v $MaCRUISE_output_dir:/OUTPUTS/ \
    masidocker/spiders:MaCRUISE_v3_1_0 \
    xvfb-run -a --server-args="-screen 0 1920x1200x24 -ac +extension GLX" \
    /extra/MaCRUISE_v3_1_0
```

Copy the T1 image to `MaCRUISE_input_dir/T1.nii.gz` and the SLANT segmentation to `MaCRUISE_input_dir/orig_target_seg.nii.gz` before step 2. The final refined segmentation is in `MaCRUISE/Output/SegRefine`, the surfaces in `MaCRUISE/Output/Surfaces`, and an overlay PDF in `MaCRUISE/Output/PDF`. The code and Docker are free for noncommercial purposes; see the [repository](https://github.com/MASILab/MaCRUISE) for the commercial terms.

{: .citation}
Yuankai Huo, Andrew J. Plassard, Aaron Carass, Susan M. Resnick, Dzung L. Pham, Jerry L. Prince, and Bennett A. Landman. "Consistent cortical reconstruction and multi-atlas brain segmentation" [NeuroImage](https://doi.org/10.1016/j.neuroimage.2016.05.030), 138 (2016): 197-210.
<br /><br />
Yuankai Huo, Aaron Carass, Susan M. Resnick, Dzung L. Pham, Jerry L. Prince, and Bennett A. Landman. "Combining multi-atlas segmentation with brain surface estimation" In Medical Imaging 2016: Image Processing, vol. 9784, p. 97840E. International Society for Optics and Photonics, 2016.
