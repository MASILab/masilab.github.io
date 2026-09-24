---
title: DeepFixel
parent: Brain
layout: gallery-item
summary: Deep learning identification of crossing fiber bundle elements
image: /assets/images/brain/deepfixel.png
repo: https://github.com/MASILab/deep_fixel
license: "MIT License"
---

DeepFixel is a deep learning method that splits multi-fiber orientation distribution functions (ODFs) into the underlying single-fiber ODFs, identifying crossing fiber bundle elements from diffusion MRI. The current release uses spherical convolutional neural networks.

## Usage

A pre-built Apptainer image and the pretrained weights are available on [Zenodo](https://zenodo.org/records/17834289) (DOI: [10.5281/zenodo.17834289](https://doi.org/10.5281/zenodo.17834289)); bind in your input and output directories with `-B`:

```bash
apptainer run -C --nv spherical_deep_fixel_v1.2.0.sif \
    deepfixel /path/to/input/fod.nii.gz \
    /path/to/output_dir \
    /app/models/best_model_scnn.pth \
    --mask /path/to/mask.nii.gz \
    --maxnum 2 \
    --lmax 6 \
    --subdivide 1 \
    --amp_threshold 0.1 \
    --model mesh_scnn \
    --batch_size 512 \
    --gpu_id 0
```

For pretrained models use `--lmax 6` and `--subdivide 1`. A Docker image can also be built from the repository, and the model can be applied to custom data through the `fissile` Python package; see the [repository](https://github.com/MASILab/deep_fixel).

{: .citation}
Adam M. Saunders, Lucas W. Remedios, Elyssa M. McMaster, Jongyeon Yoon, Gaurav Rudravaram, Adam Sadriddinov, Praitayini Kanakaraj, Bennett A. Landman, and Adam W. Anderson. "DeepFixel: Crossing white matter fiber identification through spherical convolutional neural networks" In SPIE Medical Imaging: Clinical and Biomedical Imaging, 2026. [https://arxiv.org/abs/2511.03893](https://arxiv.org/abs/2511.03893).
