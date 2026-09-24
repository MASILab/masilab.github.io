---
title: White Matter Learning
parent: Brain
layout: gallery-item
summary: White matter bundle segmentation from T1-weighted MRI
image: /assets/images/brain/wml.png
repo: https://github.com/MASILab/WM_learning_release
license: "See license.md in repository"
---

{: .note}
White matter learning (WML) is used together with [CoRNN](/brain/cornn) for tractography on T1-weighted MRI.

White matter learning is a spatially localized, patch-wise framework that delineates white matter regions from structural (T1-weighted) images. It is trained on white matter pathways reconstructed by six state-of-the-art tractography algorithms (TractSeg, Recobundles, XTRACT, Tracula, AFQ, and AFQClipped), which serve as ground truth, so users can pick the bundle definition that best fits their needs. The output is a probability map rather than a binary image, giving users more options for adjusting bundle overlap or overreach.

## Usage

Each algorithm ships as its own Singularity image with its PyTorch model, all hosted on [Zenodo](https://zenodo.org/records/15320036): [TractSeg](https://zenodo.org/records/15320036), [RecoBundles](https://zenodo.org/records/15339811), [XTRACT](https://zenodo.org/records/15339809), [Tracula](https://zenodo.org/records/15320865), [AFQ](https://zenodo.org/records/15320033), and [AFQClipped](https://zenodo.org/records/15339817). Place the T1 file (any name, `.nii.gz`) in `./INPUTS`, unzip the model archive to `$algorithm_model_path`, then:

```bash
singularity run \
    --bind $HOME/INPUTS:/INPUTS \
    --bind $HOME/OUTPUTS:/OUTPUTS \
    --bind $algorithm_model_path:/MODEL \
    --contain -e --nv \
    $singularity_path
```

All Singularity images currently support **GPU mode only**. A sample test T1 image with expected outputs is available on Zenodo for validation; output file descriptions per algorithm are in the [repository](https://github.com/MASILab/WM_learning_release).

{: .citation}
Qi Yang, Colin B. Hansen, Leon Y. Cai, Francois Rheault, Ho Hin Lee, Shunxing Bao, Bramsh Qamar Chandio, Owen Williams, Susan M. Resnick, Eleftherios Garyfallidis, Adam W. Anderson, Maxime Descoteaux, Kurt G. Schilling, and Bennett A. Landman. "Learning white matter subject-specific segmentation from structural MRI" [Medical Physics](https://doi.org/10.1002/mp.15495), 49.4 (2022): 2502-2513.
