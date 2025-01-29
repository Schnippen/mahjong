/*   //MenuPanel is not in use due to technical reasons, there are no portals in react native ; / 
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
//isWinning.ts:
/*     if (ron && playerName !== 'player1') {
      console.log(`AI player ${playerName} pressed RON ^^^^^^^^^`);
      //handle ron PLAYER
      dispatch(START_GAME({phase: 'ended'}));
      dispatch(INTERRUPT_TURN({val: true}));
      soundFunc({type: 'ron'});
      dispatch(
        changeWhoTheWinnerIs({
          TypeOfAction: 'update',
          valuePlayerName: playerName,
          valuePlayerWind: winnerWind,
        }),
        changeWhoTheLoserIs({
          TypeOfAction: 'updateRON',
          valuePlayerName: latestTurn,
          valuePlayerWind: latestTurn, //it may not work due to the order of AIAutomatedTurn and runGame().
        }),
      );
      navigation.navigate('EndRoundScreen');
    }
    if (tsumo && playerName !== 'player1') {
      const playerWindMap: Record<string, WindTypes> = {
        //wintypes has "null"
        player2: player2Wind,
        player3: player3Wind,
        player4: player4Wind,
      };
      const AIWinningWind = playerWindMap[playerName];
      if (!AIWinningWind) {
        console.error(`Invalid playerName: ${playerName}`);
        //this won't happen, but a fallback is welcome
        return;
      }
      //must be the correct player turn ....
      console.log(`AI player ${playerName} pressed TSUMO ^^^^^^^^^`);
      dispatch(START_GAME({phase: 'ended'}));
      dispatch(INTERRUPT_TURN({val: true}));
      soundFunc({type: 'tsumo'});
      dispatch(
        changeWhoTheWinnerIs({
          TypeOfAction: 'update',
          valuePlayerName: playerName,
          valuePlayerWind: AIWinningWind,
        }),
        changeWhoTheLoserIs({
          TypeOfAction: 'updateTSUMO',
          valuePlayerName: playerName,
          valuePlayerWind: AIWinningWind,
        }),
      );
      navigation.navigate('EndRoundScreen');
    } */
