/*   //MenuPanel is not in use due to technical reasons
//better suited for react portal
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSelectionModeEnabled, setIsSelectionModeEnabled] =
    useState<boolean>(false);

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };const MenuPanel = ({navigation}: {navigation: any}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'pink',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 0,
      }}>
      <ButtonQuestionmark text="Q" />
      <ButtonSettings navigation={navigation} toggleOverlay={toggleOverlay} />
    </View>
  );
};
 */
