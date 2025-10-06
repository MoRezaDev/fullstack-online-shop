export function persianSlugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, ''); // remove weird chars, keep persian + english + numbers + -
}

export function createDefaultSeo(title: string) {
  const slug = persianSlugify(title);

  const seo = {
    title: `${title} | بهترین قیمت و خرید آنلاین`,
    description: `خرید ${title} با بهترین قیمت و کیفیت از فروشگاه ما. بررسی مشخصات، تصاویر و نظرات کاربران.`,
    keywords: [
      `خرید ${title}`,
      `قیمت ${title}`,
      `${title} ارزان`,
      `${title} اصل`,
    ],
    slug,
    og_title: `${title} | فروشگاه آنلاین`,
    og_description: `خرید ${title} با ارسال سریع و گارانتی معتبر.`,
    twitter_title: `${title} | فروشگاه آنلاین`,
    twitter_description: `خرید ${title} با بهترین قیمت.`,
  };

  return seo;
}
