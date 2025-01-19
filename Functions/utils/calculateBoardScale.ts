/*   const [BoardSize, setBoardSize] = useState({width: 0, height: 0});
  const [ViewSize, setViewSize] = useState({width: 0, height: 0});
  const onLayoutView = (event: any, kind: 'Board' | 'View') => {
    const {width, height} = event.nativeEvent.layout;

    if (
      kind === 'Board' &&
      (width !== BoardSize.width || height !== BoardSize.height)
    ) {
      setBoardSize({width, height});
      console.log(`Updated Board Size: width=${width}, height=${height}`);
    }

    if (
      kind === 'View' &&
      (width !== ViewSize.width || height !== ViewSize.height)
    ) {
      setViewSize({width, height});
      console.log(`Updated View Size: width=${width}, height=${height}`);
    }
  };
  const scaleX = ViewSize.width / BoardSize.width;
  const scaleY = ViewSize.height / BoardSize.height;
  const scale = Math.min(scaleX, scaleY);
  console.log('SCALE:', scale);onLayout={event => onLayoutView(event, 'View')} onLayout={event => onLayoutView(event, 'Board')} */
