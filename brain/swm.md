---
title: Superficial WM
parent: Brain
layout: gallery-item
summary: Surfaces at various white matter depths (Laplace-field based)
image: /assets/images/brain/swm.png
repo: https://github.com/jordandekraker/superficial-white-matter
license: "See repository"
---

Superficial White Matter generates surfaces at various white matter depths (default 1, 2, and 3 mm). The depths are calculated from the real-world voxel size, and each surface is produced by computing a Laplace field over white matter (cortex to subcortex plus ventricles) and shifting an existing white matter surface along that gradient, with stopping conditions set by geodesic distance travelled. The tool is also implemented in [micapipe v0.2.3](https://github.com/MICA-MNI/micapipe/releases/tag/v0.2.3).

## Usage

The code expects standard NIFTI orientation (run inputs through `fslreorient2std`). With a FreeSurfer/FastSurfer subject directory:

```bash
# 1. Calculate the Laplace field over white matter
python sWM/laplace_solver.py \
    ${aparc_aseg_nifti} \
    ${OUT}/${SUBJECT}_laplace-wm.nii.gz

# 2. Generate the depth surfaces for each hemisphere
for hemi in lh rh; do
    python sWM/surface_generator.py \
        "${OUT}/${SUBJECT}_hemi-${hemi}_label-white.surf.gii" \
        ${OUT}/${SUBJECT}_laplace-wm.nii.gz \
        ${OUT}/${SUBJECT}_hemi-${hemi}_label-sWF_depth- \
        1 2 3
done
```

Installation is `git clone` plus `pip install superficial-white-matter/`; a complete worked example is in the [repository](https://github.com/jordandekraker/superficial-white-matter).

{: .citation}
Jordan DeKraker, Ricardo Cruces, and Yu Hwang. "Superficial White Matter" [Zenodo](https://doi.org/10.5281/zenodo.11510179), 2024.
