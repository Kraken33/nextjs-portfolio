import { NotionTextSchema, NotionTextPropertyOptions } from '@/types/notion';
import { FC, memo } from 'react';
import map from 'lodash/fp/map';

type RenderNotionTextBlockComponent = {
  block: NotionTextSchema | string;
};

const options2ClassName = (option: NotionTextPropertyOptions) => {
  const classes = {
    b: 'font-bold',
    _: 'underline',
    i: 'italic',
  };
  return classes[option];
};

export const RenderNotionTextBlock: FC<RenderNotionTextBlockComponent> = memo(
  ({ block }) => {
    return typeof block === 'string'
      ? block
      : block.map(({ text, options }, idx) => (
          <span key={idx} className={map(options2ClassName)(options)}>
            {text}
          </span>
        ));
  }
);
