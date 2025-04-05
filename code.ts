figma.showUI(__html__, {width:600, height:800})
figma.ui.onmessage = async (data) => {

  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  const { navbarType, color, theme, menuItems }: { navbarType: string; color: RGB; theme: string; menuItems: string[] } = data;
  
  // Frame dimensions
  const frameWidth = navbarType === 'horizontal' ? 800 : 300;
  const frameHeight = navbarType === 'horizontal' ? 80 : 400;
  
  // Create the frame
  const frame = figma.createFrame();
  frame.name = "Navbar";
  frame.resizeWithoutConstraints(frameWidth, frameHeight);
  
  // Center the frame in our current viewport
  frame.x = figma.viewport.center.x - frameWidth / 2;
  frame.y = figma.viewport.center.y - frameHeight / 2;
  
  // Navbar background
  const background = figma.createRectangle();
  frame.appendChild(background);
  background.resizeWithoutConstraints(frameWidth, frameHeight);
  background.fills = [{ type: 'SOLID', color: color }];
  background.constraints = {horizontal: 'STRETCH', vertical: 'STRETCH'};
  
  // Text color based on theme
  const textColor = theme === 'light' 
    ? {r: 0, g: 0, b: 0} 
    : {r: 1, g: 1, b: 1};

  // Add menu items
  if (navbarType === 'horizontal') {
    const itemWidth = frameWidth / menuItems.length;
    
    menuItems.forEach((item, index) => {
      const menuItem = figma.createText();
      frame.appendChild(menuItem);
      menuItem.characters = item;
      menuItem.fills = [{ type: 'SOLID', color: textColor }];
      menuItem.fontSize = 16;
      menuItem.textAlignHorizontal = 'CENTER';
      
      // Position text
      const textWidth = itemWidth * 0.8;
      menuItem.resizeWithoutConstraints(textWidth, 24);
      menuItem.x = index * itemWidth + (itemWidth - textWidth) / 2;
      menuItem.y = (frameHeight - 24) / 2;
    });
  } else {
    // Vertical navbar
    const itemHeight = 50;
    
    menuItems.forEach((item, index) => {
      const menuItem = figma.createText();
      frame.appendChild(menuItem);
      menuItem.characters = item;
      menuItem.fills = [{ type: 'SOLID', color: textColor }];
      menuItem.fontSize = 16;
      menuItem.textAlignHorizontal = 'LEFT';
      
      // Position text
      menuItem.resizeWithoutConstraints(frameWidth - 40, 24);
      menuItem.x = 20;
      menuItem.y = 20 + index * itemHeight;
    });
  }

  figma.closePlugin();
}