export async function generateSeo(
  type: 'product' | 'brand' | 'category',
  title: string,
  url: string,
  colors?: string[],
  shop: string = 'نام فروشگاه',
  image?: string,
) {
  const seoColors = colors?.length ? colors.join(', ') : '';
  const seoTitle =
    type === 'product'
      ? `قیمت و خرید ${title}`
      : `خرید بهترین مدل های ${title}`;

  const seoDescription =
    type === 'product'
      ? `خرید اینترنتی ${title}، با رنگ بندی ${seoColors}، به همراه مقایسه، بررسی و لیست قیمت امروز در فروشگاه آنلاین ${shop}`
      : `خرید انواع ${title}، از بهترین برند های معتبر در فروشگاه اینترنتی ${shop}`;
  const open_graph = {
    title,
    image: image ? image : '',
    site: 'Onlineshop',
    type,
    url,
  };

  return {
    title: seoTitle,
    description: seoDescription,
    open_graph: {
      create: open_graph,
    },
    canonical_url: seoDescription,
  };
}

export function persianSlugify(str: string): string {
  return str
    .trim() 
    .toLowerCase() 
    .replace(/\s+/g, '-') 
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, ''); // remove weird chars, keep persian + english + numbers + -
}
