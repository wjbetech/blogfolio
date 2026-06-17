import { getPrimaryProjectImage, getProjectImageOrderKey, sortProjectImages } from "@/lib/projectImages";

describe("projectImages", () => {
  it("extracts numeric order from image filenames", () => {
    expect(getProjectImageOrderKey("/images/assets/projects/wowcomps/1.home.png")).toBe(1);
    expect(getProjectImageOrderKey("/images/assets/projects/wowcomps/12.preview.png")).toBe(12);
    expect(getProjectImageOrderKey("/images/assets/projects/wowcomps/home.png")).toBeNull();
  });

  it("sorts images by numeric prefix ascending", () => {
    const images = [
      "/images/assets/projects/picme/5.hangman-mode.png",
      "/images/assets/projects/picme/1.home.png",
      "/images/assets/projects/picme/3.multiple-choice.png"
    ];

    expect(sortProjectImages(images)).toEqual([
      "/images/assets/projects/picme/1.home.png",
      "/images/assets/projects/picme/3.multiple-choice.png",
      "/images/assets/projects/picme/5.hangman-mode.png"
    ]);
  });

  it("returns the image prefixed with 1. as the primary card image", () => {
    const images = [
      "/images/assets/projects/wowcomps/3.name-editing.png",
      "/images/assets/projects/wowcomps/1.home.png",
      "/images/assets/projects/wowcomps/2.dnd-example.png"
    ];

    expect(getPrimaryProjectImage(images)).toBe("/images/assets/projects/wowcomps/1.home.png");
  });

  it("falls back to the first sorted image when no 1. prefix exists", () => {
    const images = ["/images/assets/projects/legacy/b.png", "/images/assets/projects/legacy/a.png"];

    expect(getPrimaryProjectImage(images)).toBe("/images/assets/projects/legacy/a.png");
  });
});
