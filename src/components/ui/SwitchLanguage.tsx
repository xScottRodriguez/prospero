import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

export const SwitchLanguage = () => {
  return (
    <Menu isLazy>
      <MenuButton>Open menu</MenuButton>
      <MenuList>
        {/* MenuItems are not rendered unless Menu is open */}
        <MenuItem>New Window</MenuItem>
        <MenuItem>Open Closed Tab</MenuItem>
        <MenuItem>Open File</MenuItem>
      </MenuList>
    </Menu>
  )
}
