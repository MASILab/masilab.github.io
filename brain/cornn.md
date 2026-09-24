---
title: CoRNN
parent: Brain
layout: gallery-item
summary: Convolutional-recurrent neural network tractography on T1-weighted MRI
image: /assets/images/brain/cornn.png
repo: https://github.com/MASILab/cornn_tractography
license: "See repository"
---

{: .note}
CoRNN runs tractography on T1-weighted MRI, no diffusion needed. It builds on [SLANT](/brain/slant) and [White matter learning](/brain/wml) segmentations.

CoRNN approximates diffusion tractography from T1-weighted MRI and associated anatomical context using a convolutional-recurrent neural network. The methodology is still actively being characterized, validated, and extended; if you are interested in working with the MASI Lab on running tractography on T1w MRI, contact the authors via the [repository](https://github.com/MASILab/cornn_tractography).

## Usage

A pre-built container can be downloaded from [masi.vuse.vanderbilt.edu](https://masi.vuse.vanderbilt.edu/CoRNN/CoRNN_v1.0.0.sif), or built from the repository (`git checkout v1.0.0 && sudo singularity build CoRNN_v1.0.0.sif Singularity`):

```bash
singularity run \
    -e \
    --contain \
    -B <t1_file>:/data/T1.nii.gz \
    -B <out_dir>:/data \
    -B <slant_dir>:/data/slant \
    -B <wml_dir>:/data/wml \
    -B /tmp:/tmp \
    --nv \
    /path/to/CoRNN_v1.0.0.sif \
    /data/T1.nii.gz \
    /data/<out_name> \
    --slant /data/slant \
    --wml /data/wml
```

`<out_name>` is the output tractogram name with a trk, tck, vtk, fib, or dpy extension. Options include `--num_streamlines` (default 1,000,000), `--device cuda/cpu`, and `--force`; see the [repository](https://github.com/MASILab/cornn_tractography) for the full argument list.

{: .citation}
Leon Y. Cai, Ho Hin Lee, Nancy R. Newlin, Cailey I. Kerley, Praitayini Kanakaraj, Qi Yang, Graham W. Johnson, Daniel Moyer, Kurt G. Schilling, Francois Rheault, and Bennett A. Landman. "Convolutional-recurrent neural networks approximate diffusion tractography from T1-weighted MRI and associated anatomical context" [bioRxiv](https://www.biorxiv.org/content/10.1101/2023.02.25.530046v2), 2023.
<br /><br />
Leon Y. Cai, Ho Hin Lee, Graham W. Johnson, et al. "Tractography from T1-weighted MRI: Empirically exploring the clinical viability of streamline propagation without diffusion MRI" [Imaging Neuroscience](https://direct.mit.edu/imag/article/doi/10.1162/imag_a_00259/123726), 2024.
