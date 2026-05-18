import slugifyLib from 'slugify';

export const slugify = (text: string): string => {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true
  });
};

export const generateUniqueSlug = async (
  text: string,
  Model: any,
  field: string = 'slug'
): Promise<string> => {
  let slug = slugify(text);
  let counter = 1;

  while (await Model.findOne({ [field]: slug })) {
    slug = `${slugify(text)}-${counter}`;
    counter++;
  }

  return slug;
};
