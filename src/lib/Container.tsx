import * as React from 'react';

(globalThis as any).TargetMap = new Map()

export default function Container() {
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // @ts-ignore
      if (e.target.nodeName == 'BUTTON' && e.target!.classList!.contains('ripple-btn') && e.target.dataset?.btnId && globalThis?.TargetMap.get(e.target.dataset.btnId)) {
        // @ts-ignore
        const handleClick = globalThis?.TargetMap.get(e.target.dataset.btnId);
        
        // @ts-ignore
        if (handleClick) {
          const span = document.createElement('span');
          const button = e.target;
          if (button) {
            // @ts-ignore
            const { left, top } = button.getBoundingClientRect();

            // @ts-ignore
            button.appendChild(span);
            // @ts-ignore
            span.style.cssText = `--width: ${button.getBoundingClientRect().width}px;--height: ${
              // @ts-ignore
              button.getBoundingClientRect().width
            }px`;
            span.style.left = e.pageX - left + 'px';

            span.style.top = e.pageY - top + 'px';
            span.style.animation = 'ripple 0.5s linear';
            span.addEventListener('animationend', () => span.remove());
          }
          handleClick();
        }
      }
      // @ts-ignore
      if (e.target.nodeName == 'BUTTON' && e.target!.classList!.contains('simple-btn') && e.target.dataset?.btnId && globalThis?.TargetMap.get(e.target.dataset.btnId)) {
        // @ts-ignore
        const handleClick = globalThis?.TargetMap.get(e.target.dataset.btnId);
        
        // @ts-ignore
        if (handleClick) {
          handleClick();
        }
      }
    }
    document.body.addEventListener('click', handleClick);
    return () =>  {
      document.body.removeEventListener('click', handleClick);
      (globalThis as any)?.TargetMap.clear()
    };
  }, []);
  return null;
}