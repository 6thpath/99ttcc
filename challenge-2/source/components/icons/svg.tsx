import type { SVGComponentProps } from './types'

export const SVGComponent: React.FC<SVGComponentProps> = ({ size, width, height, ...props }) => {
  return <svg width={size ?? width ?? 24} height={size ?? height ?? 24} viewBox="0 0 24 24" fill="currentColor" {...props} />
}

// eslint-disable-next-line react-refresh/only-export-components
export const createSVGComponent = (initialProps: SVGComponentProps): React.FC<SVGComponentProps> => {
  return (props: SVGComponentProps) => SVGComponent({ ...initialProps, ...props })
}
