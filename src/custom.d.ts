declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content as string;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.mp4";
