import { FC, PropsWithChildren } from 'react';
import { Trans } from 'react-i18next';

const I18n: FC<
  PropsWithChildren<{
    i18nKey: string;
    values?: object;
    components?: { readonly [tagName: string]: React.ReactElement };
  }>
> = ({ i18nKey, children = 'Translation Placeholder', values = {}, components = {} }) => {
  return (
    <Trans i18nKey={i18nKey} values={values} components={components}>
      {children}
    </Trans>
  );
};

export default I18n;
