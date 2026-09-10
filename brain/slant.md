---
title: SLANT
parent: Brain
layout: gallery-item
summary: The original BrainCOLOR segmentation from T1-weighted MRI
image: /assets/images/brain/slant.jpg
repo: https://github.com/MASILab/SLANTbrainSeg
license: "BSD 3-Clause License"
---

{: .note}
[SLANT-TICV](/brain/slant-ticv) and [UNesT](/brain/unest) are updated models trained on the same data as SLANT.

SLANT is a tile-based deep learning model that segments 133 regions of interest from a T1-weighted MRI. These labels are based on the [BrainCOLOR](http://braincolor.mindboggle.info/) protocol.

See the [SPINS page](https://masilab.github.io/SPINS/brainCOLOR_cortical) on the BrainCOLOR protocol for visualizations of each region.

## Usage

With a T1-weighted image in `./input`, for example `./input/T1w.nii.gz`:

```bash
mkdir -p ./output/{pre,dl,post}
apptainer run \
    -e --contain \
    --nv \
    -B ./input:/opt/slant/matlab/input_pre \
    -B ./input:/opt/slant/matlab/input_post \
    -B ./output/pre:/opt/slant/matlab/output_pre \
    -B ./output/dl:/opt/slant/dl/working_dir \
    -B ./output/post:/opt/slant/matlab/output_post \
    --home ./input \
    docker://vuiis/slant:deep_brain_seg_v1_0_0 \
    /opt/slant/run.sh
```

The output segmentation will be in `./output/post/FinalResult/T1w_seg.nii.gz`.

{: .citation}
Yuankai Huo, Zhoubing Xu, Yunxi Xiong, Katherine Aboud, Parasanna Parvathaneni, Shunxing Bao, Camilo Bermudez, Susan M. Resnick, Laurie E. Cutting, and Bennett A. Landman. "3D whole brain segmentation using spatially localized atlas network tiles" NeuroImage 2019.
<br /><br />
Yuankai Huo, Zhoubing Xu, Katherine Aboud, Parasanna Parvathaneni, Shunxing Bao, Camilo Bermudez, Susan M. Resnick, Laurie E. Cutting, and Bennett A. Landman. "Spatially Localized Atlas Network Tiles Enables 3D Whole Brain Segmentation" In International Conference on Medical Image Computing and Computer-Assisted Intervention, MICCAI 2018.

