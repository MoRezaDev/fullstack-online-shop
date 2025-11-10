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

export function toPersianDateTime(
  format: 'numbers' | 'long',
  date: Date = new Date(),
): { date: string; time: string } {
  const dateFormatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: format === 'long' ? 'long' : '2-digit',
    day: '2-digit',
  });

  const timeFormatter = new Intl.DateTimeFormat('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  let formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  if (format === 'numbers') {
    formattedDate = formattedDate.replaceAll('-', '/');
  }

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
