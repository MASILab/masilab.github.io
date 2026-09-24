---
title: UNesT
parent: Brain
layout: gallery-item
summary: Transformer-based whole brain, renal, and multi-organ segmentation
image: /assets/images/brain/unest.png
repo: https://github.com/MASILab/UNesT
license: "MIT License"
---

{: .note}
UNesT is the updated model trained on the same data as [SLANT](/brain/slant); the SLANT page links here as the successor.

UNesT (local spatial representation learning with a hierarchical Transformer) is a segmentation model that achieves state-of-the-art results on whole brain segmentation (132 regions plus TICV/PFV), renal substructure segmentation, and multi-organ (BTCV) segmentation. A pre-built Singularity container is provided for whole brain segmentation, and the renal and multi-organ variants are also available as [MONAI Bundles](https://github.com/Project-MONAI/model-zoo/tree/dev/models).

## Usage

Whole brain segmentation runs from a pre-built Singularity image (download the `.sif` from the [repository](https://github.com/MASILab/UNesT/tree/main/wholebrainSeg)):

```bash
singularity run -e --contain \
    --home /path/to/inputs/directory/ \
    -B /path/to/inputs/directory/:/INPUTS \
    -B /path/to/working/directory/:/WORKING_DIR \
    -B /path/to/output/directory/:/OUTPUTS \
    -B /tmp:/tmp \
    --nv \
    /path/to/wholebrain.sif \
    --ticv --w_skull --overlap 0.5 --device 1
```

For renal substructure and multi-organ segmentation, use the inference scripts in the repository or the linked MONAI Bundles.

{: .citation}
Xin Yu, Qi Yang, Yinchi Zhou, Leon Y. Cai, Riqiang Gao, Ho Hin Lee, Thomas Li, Shunxing Bao, Zhoubing Xu, Thomas A. Lasko, et al. "UNesT: local spatial representation learning with hierarchical transformer for efficient medical segmentation" [Medical Image Analysis](https://doi.org/10.1016/j.media.2023.102939), 2023.
