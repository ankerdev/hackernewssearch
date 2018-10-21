import * as React from 'react';

interface IProps {
  author: string | JSX.Element;
  blurred?: boolean;
  onClick?: () => void;
  title: string;
}

export const Article = (props: IProps) => {
  const {
    author,
    blurred,
    onClick,
    title,
  } = props;

  const divProps = {
    className: `article${blurred ? '--blurred' : ''} flex align-center justify-between ${onClick !== undefined ? 'pointer' : ''}`,
    ...(onClick !== undefined
      ? { onClick: () => onClick() }
      : {}
    ),
  };

  return (
    <div {...divProps}>
      <div className="flex-down align-start justify-start">
        <b className="title">{title}</b>
        <div className="flex align-center justify-start mt-0p5">
          <p className="author">{author}</p>
        </div>
      </div>
    </div>
  );
}
