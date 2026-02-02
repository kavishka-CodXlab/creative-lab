// Overflow Debugger - Run this in browser console to find overflow elements
export function debugOverflow() {
  console.log('🔍 Checking for overflow elements...');
  
  const viewportWidth = document.documentElement.clientWidth;
  const overflowElements: any[] = [];
  
  document.querySelectorAll('*').forEach((el) => {
    const element = el as HTMLElement;
    const rect = element.getBoundingClientRect();
    const scrollWidth = element.scrollWidth;
    
    // Check if element extends beyond viewport
    if (scrollWidth > viewportWidth || rect.right > viewportWidth) {
      overflowElements.push({
        element: element,
        tag: element.tagName,
        class: element.className,
        scrollWidth: scrollWidth,
        viewportWidth: viewportWidth,
        overflow: scrollWidth - viewportWidth,
        rectRight: rect.right
      });
      
      // Highlight the element
      element.style.outline = '3px solid red';
      element.style.outlineOffset = '-3px';
    }
  });
  
  if (overflowElements.length > 0) {
    console.log('❌ Found overflow elements:', overflowElements);
    console.table(overflowElements.map(item => ({
      Tag: item.tag,
      Class: item.class.substring(0, 50),
      'Scroll Width': item.scrollWidth,
      'Viewport Width': item.viewportWidth,
      'Overflow By': item.overflow
    })));
  } else {
    console.log('✅ No overflow elements found!');
  }
  
  return overflowElements;
}

// Auto-run on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('Running overflow debugger...');
      debugOverflow();
    }, 1000);
  });
}

// Make it available globally
if (typeof window !== 'undefined') {
  (window as any).debugOverflow = debugOverflow;
}
