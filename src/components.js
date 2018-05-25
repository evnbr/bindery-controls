import { div, button, select, option } from './dom';
import c from './prefixClass';

const row = children => div(c('row'), children);

// Button
const btn = (attrs, txt) => button(`${c('control')} ${c('btn')}`, attrs, txt);
const btnMain = (attrs, txt) => button(`${c('control')} ${c('btn')} ${c('btn-main')}`, attrs, txt);

const dropdown = (attrs, options) => {
  const selectVal = div(c('select-val'), [], 'Value');
  const selectEl = select(c('select'), attrs, options);
  const updateVal = () => {
    selectVal.textContent = selectEl.options[selectEl.selectedIndex].text;
  };
  selectEl.addEventListener('change', updateVal);
  updateVal();
  return div(`${c('select-wrap')} ${c('control')}`, [selectVal, selectEl]);
};

export {
  row,
  btn,
  btnMain,
  dropdown,
  option,
  div,
};
