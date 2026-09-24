---
title: BRAID
parent: Brain
layout: gallery-item
summary: Brain age identification from diffusion MRI
image: /assets/images/brain/braid.png
repo: https://github.com/MASILab/BRAID
license: "CC BY-NC 4.0"
---

BRAID estimates brain age from diffusion MRI. Unlike its counterparts, which typically use anatomical features (such as volume and shape of brain regions), BRAID deliberately destroys anatomical information through non-rigid transformations so it can focus on subtle microstructural changes that predate apparent anatomical changes in neurodegeneration. The goal is not a perfect chronological age estimator, but an earlier biomarker for neurodegenerative disease prediction.

## Usage

A pre-built Singularity container is available on [Zenodo](https://zenodo.org/records/15091613) (DOI: [10.5281/zenodo.15091613](https://doi.org/10.5281/zenodo.15091613)); all dependencies are pre-installed inside the container. Provide an `INPUTS` folder containing `dwmri.nii.gz`, `dwmri.bval`, `dwmri.bvec` (PreQual-preprocessed), `T1w.nii.gz`, `T1w_seg.nii.gz` (brain mask), and `demog.json` (demographic information), then:

```bash
singularity run -e --contain \
    -B /path/to/INPUTS:/INPUTS \
    -B /path/to/OUTPUTS:/OUTPUTS \
    -B /tmp:/tmp \
    /path/to/braid_v1.0.0.sif
```

Expected runtime is about 3 hours. The outputs appear in the `final` folder of `OUTPUTS`: `braid_predictions.csv` (brain age estimates by model, before and after bias correction) and `QA.png` (visualization of the brain images and estimates). A worked example with sample data is included in the [Zenodo record](https://zenodo.org/records/15091613). Alternatively, the source code can be run from the [repository](https://github.com/MASILab/BRAID) (Python 3.11+; model weights on [Hugging Face](https://huggingface.co/chenyugoal/braid-v1.0/tree/main)).

{: .citation}
Chenyu Gao, Michael E. Kim, Karthik Ramadass, Praitayini Kanakaraj, Aravind R. Krishnan, Adam M. Saunders, et al. "Brain age identification from diffusion MRI synergistically predicts neurodegenerative disease" [Imaging Neuroscience](https://doi.org/10.1162/imag_a_00552), 2025.
<br /><br />
Chenyu Gao, et al. "Predicting age from white matter diffusivity with residual learning" In Medical Imaging 2024: Image Processing. International Society for Optics and Photonics, 2024. [https://doi.org/10.1117/12.3006525](https://doi.org/10.1117/12.3006525).
