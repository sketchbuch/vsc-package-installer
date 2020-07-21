import { expect } from 'chai';
import { mockTabBoxItems } from '../../../../mocks';
import { tabboxSnippet } from '../../../../../templates/package';

suite('tabboxSnippet()', () => {
  test('Returns a string', () => {
    expect(tabboxSnippet(mockTabBoxItems)).to.be.a('string');
  });

  test('Renders correct number of buttons', () => {
    const buttons = tabboxSnippet(mockTabBoxItems).match(/tabbox__button"/g);
    expect(buttons?.length).to.equal(mockTabBoxItems.length);
  });

  test('Renders content correctly', () => {
    expect(tabboxSnippet(mockTabBoxItems)).to.contain(mockTabBoxItems[0].content());
  });

  test('Renders emptyMessage if no content', () => {
    const noContentItems = [...mockTabBoxItems];
    noContentItems[0].content = (): string => '';
    expect(tabboxSnippet(noContentItems)).to.contain(noContentItems[0].emptyMessage);
  });
});
