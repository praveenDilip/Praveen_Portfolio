PROJECT SCREENSHOT CONVENTION

Store screenshots under:
public/images/projects/<project-slug>/1.webp
public/images/projects/<project-slug>/2.webp
public/images/projects/<project-slug>/3.webp

Use portrait images (about 1080 x 2340) for Android apps and landscape images
for desktop website previews. WebP is recommended, preferably under 300 KB.
Project slugs and image paths are editable in src/data/projects.js.

Set previewMode to "desktop" for a browser window preview. Use "phone" only
when the source is a plain app screenshot that needs a device bezel. By default,
the original image is shown in full without an extra bezel or cropping. Missing
or failed images show a branded placeholder.
