export interface IMenuItem {
  name: string,
  path: string,
  children?: Array<IMenuItem>
}
