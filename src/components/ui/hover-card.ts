import { SystemStyleObject, useColorModeValue } from '@chakra-ui/react';

/**
 * Reusable hover effect for card-like components.
 * Lifts the card slightly, deepens the border, and adds a soft shadow.
 *
 * Usage:
 *   const hover = useCardHover();
 *   <Box {...hover.box} _hover={hover.hover} transition={hover.transition}>
 */
export const useCardHover = () => {
  const borderHover = useColorModeValue('gray.400', 'gray.500');

  const box: SystemStyleObject = {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
  };

  const hover: SystemStyleObject = {
    transform: 'translateY(-2px)',
    boxShadow: 'md',
    borderColor: borderHover,
  };

  return { box, hover, transition: 'all 0.2s ease' };
};
