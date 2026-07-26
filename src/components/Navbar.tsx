import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Posts', path: '/posts' },
];

export const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const navBg = useColorModeValue('rgba(250, 250, 250, 0.9)', 'rgba(15, 23, 42, 0.9)');
  const borderColor = useColorModeValue('gray.200', 'gray.800');
  const activeColor = useColorModeValue('gray.900', 'white');
  const inactiveColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <MotionBox
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(12px)"
      bg={navBg}
      borderBottom="1px solid"
      borderColor={borderColor}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxW="6xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link to="/">
            <Heading
              as="h1"
              size="md"
              fontWeight="bold"
              letterSpacing="tight"
              color={activeColor}
            >
              Hanbo Guo
            </Heading>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    fontWeight={isActive ? 'semibold' : 'normal'}
                    color={isActive ? activeColor : inactiveColor}
                    position="relative"
                  >
                    {item.label}
                    {isActive && (
                      <MotionBox
                        layoutId="activeNavIndicator"
                        position="absolute"
                        bottom="-1px"
                        left={2}
                        right={2}
                        height="2px"
                        bg={activeColor}
                        borderRadius="full"
                      />
                    )}
                  </Button>
                </Link>
              );
            })}

            <IconButton
              aria-label="Toggle dark/light mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />
          </HStack>

          {/* Mobile Menu Button */}
          <HStack display={{ base: 'flex', md: 'none' }} spacing={2}>
            <IconButton
              aria-label="Toggle mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />
            <IconButton
              aria-label="Open menu"
              icon={<FaBars />}
              onClick={onOpen}
              variant="ghost"
              size="sm"
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent bg={useColorModeValue('white', 'gray.900')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" fontSize="md">Navigation</DrawerHeader>
          <DrawerBody py={6}>
            <VStack spacing={3} align="stretch">
              {NAV_ITEMS.map((item) => (
                <Link key={item.path} to={item.path} onClick={onClose}>
                  <Button
                    w="full"
                    variant={location.pathname === item.path ? 'solid' : 'ghost'}
                    justifyContent="flex-start"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
};
