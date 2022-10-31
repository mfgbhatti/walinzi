interface Origin {
  value: string;
}

interface OriginGroup {
  disabled?: boolean;
  name: string;
  origins: Origin[];
}
export const OriginGroups: OriginGroup[] = [
  {
    name: 'asian or asian british',
    disabled: false,
    origins: [
      { value: 'indian' },
      { value: 'pakistani' },
      { value: 'bangladeshi' },
      { value: 'chinese' },
      { value: 'any other asian background' },
    ],
  },
  {
    name: 'black, black british, caribbean or african',
    disabled: false,
    origins: [
      { value: 'caribbean' },
      { value: 'african' },
      { value: 'any other black, black british, or caribbean background' },
    ],
  },

  {
    name: 'mixed or multiple ethnic groups',
    disabled: false,
    origins: [
      { value: 'white and black caribbean' },
      { value: 'white and black african' },
      { value: 'white and asian' },
      { value: 'any other mixed or multiple ethnic background' },
    ],
  },
  {
    name: 'white',
    disabled: false,
    origins: [
      { value: 'english, welsh, scottish, northern irish or british' },
      { value: 'irish' },
      { value: 'gypsy or irish traveller' },
      { value: 'roma' },
      { value: 'any other white background' },
    ],
  },
  {
    name: 'other ethnic group',
    disabled: false,
    origins: [{ value: 'arab' }, { value: 'any other ethnic group' }],
  },
];
