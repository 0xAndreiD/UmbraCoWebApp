export interface IMenuItem {
  name: string,
  path: string,
  level: number,
  children?: Array<IMenuItem>
}
