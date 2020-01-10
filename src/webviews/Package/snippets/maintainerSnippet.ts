import { NpmMaintainer } from '../../../types';
import { inlineListSnippet } from '.';
import { mapNpmObjToInlineList } from '../../../utils';

const maintainerSnippet = (maintainers: NpmMaintainer[] | undefined): string => {
  if (maintainers && maintainers.length > 0) {
    const items = mapNpmObjToInlineList(maintainers);
    return inlineListSnippet(items, 'Maintainers');
  }

  return '';
};

export default maintainerSnippet;
