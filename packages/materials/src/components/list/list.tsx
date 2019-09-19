import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-list',
  styleUrl: 'list.scss',
  shadow: true
})
export class List {
  @Element() host: HTMLElement;
  /**
   * Optional, styles the density of the list, making it appear more compact.
   */
  @Prop() dense = false;
  /**@deprecated use dense instead */
  @Prop() size: HTMLMaterialsListItemElement["size"];

  /**
   * Optional, make a list selectable
   */
  @Prop() selectable = false;
  /**
   * Optional, if the list is selectable it can be a multiple selection 
   */
  @Prop() multiple = false;
  
  componentDidLoad() {
    const listItem = this.host.querySelectorAll('materials-list-item');
    const listItemCheckbox = this.host.querySelectorAll('materials-list-item-checkbox');
    if (this.size && listItem) Array.from(listItem).forEach(e => e.size = this.size);
    if (this.size && listItemCheckbox) Array.from(listItemCheckbox).forEach(e => e.size = this.size);
    
    if (this.selectable && listItem) {
      Array.from(listItem).forEach(e => {
        e.selectable = this.selectable
        if(!this.multiple){
          e.addEventListener('itemSelected',()=>{
            listItem.forEach(el=>{
              if(el != e){
                el.selected = false;
              }
            })
          });
        }
      });

    } 
  }

  render() {
    return (
      <ul class={{ 'mdc-list': true, 'mdc-list--dense': this.dense }}>
        <slot />
      </ul>
    );
  }
}
