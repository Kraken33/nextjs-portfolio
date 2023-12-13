import { NotionTextSchema, NotionTextPropertyOptions } from '@/types/notion';
import { FC, memo } from 'react';
import map from 'lodash/fp/map';
import join from 'lodash/fp/join';

type RenderNotionTextBlockComponent = {
  block: NotionTextSchema | string;
};

const options2ClassName = (option: NotionTextPropertyOptions) => {
  const classes = {
    b: 'font-bold',
    _: 'underline',
    i: 'italic',
  };
  return option ? classes[option] : '';
};

export const RenderNotionTextBlock: FC<RenderNotionTextBlockComponent> = memo(
  ({ block }) => {
    return typeof block === 'string'
      ? block
      : block.map(({ text, options }, idx) => (
          <span
            key={idx}
            className={join(' ')(map(options2ClassName)(options))}
          >
            {text}
          </span>
        ));
  }
);
