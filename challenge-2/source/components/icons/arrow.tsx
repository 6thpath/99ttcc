import { createSVGComponent } from './svg'

export const IconArrowUp = createSVGComponent({
  fill: 'none',
  children: (
    <path
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
})
