import { useRef, useEffect, useMemo } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { AppHeader } from '../../ui/client/Default';
import { ClientDefaultStyle } from '../../styles/client/Default';
import { useOrderViewModel } from '../../../models/OrderViewModel';
import { OrderClientStyles } from '../../styles/client/Order';

import {
  SectionIntro,
  SectionWashCheck,
  SectionOnlyWashCheck,
  SectionProblemsCore,
  SectionProblemsChassis,
  SectionDescription,
  SectionCart,
  NavigationArrows,
} from '../../ui/client/Order';

const { width } = Dimensions.get('window');

export default function OrderScreen() {
  const { state, actions } = useOrderViewModel();
  const scrollRef = useRef(null);
  const handleBackButtonPress = () => {
    if (state.currentSectionIndex > 0) {
      actions.goToPrevSection();
    } else {
      actions.handleCancel();
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: width * state.currentSectionIndex,
      animated: true,
    });
  }, [state.currentSectionIndex]);

  const sectionComponents = useMemo(
    () => ({
      Intro: <SectionIntro style={{ width }} />,
      WashCheck: (
        <SectionWashCheck
          style={{ width }}
          draft={state.draft}
          onUpdate={actions.updateDraftField}
        />
      ),
      OnlyWashCheck: (
        <SectionOnlyWashCheck
          style={{ width }}
          draft={state.draft}
          onUpdate={actions.updateDraftField}
        />
      ),
      ProblemsCore: (
        <SectionProblemsCore
          style={{ width }}
          draft={state.draft}
          onUpdate={actions.updateDraftField}
        />
      ),
      ProblemsChassis: (
        <SectionProblemsChassis
          style={{ width }}
          draft={state.draft}
          onUpdate={actions.updateDraftField}
        />
      ),
      Description: (
        <SectionDescription
          style={{ width }}
          draft={state.draft}
          onChange={actions.handleDescriptionChange}
          count={state.charCount}
          isError={state.isCharLimitExceeded}
        />
      ),
      Cart: (
        <SectionCart
          style={{ width }}
          draft={state.draft}
          onSubmit={actions.handleSubmitOrder}
          onCancel={actions.handleCancel}
          estimatedBudget={state.estimatedBudget}
        />
      ),
    }),
    [
      state.draft,
      state.charCount,
      state.isCharLimitExceeded,
      state.estimatedBudget,
      actions,
    ]
  );

  return (
    <View style={ClientDefaultStyle.container}>
      <AppHeader
        styleSet={ClientDefaultStyle}
        authStatus={state.authStatus}
        onLeftButtonPress={actions.handleHeaderButtonPress}
        onBackButtonPress={handleBackButtonPress}
      />
      <View style={OrderClientStyles.swiperContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={OrderClientStyles.scrollView}>
          {state.sectionFlow.map((sectionName) => {
            const SectionComponent = sectionComponents[sectionName];
            return SectionComponent ? (
              <View key={sectionName}>{SectionComponent}</View>
            ) : null;
          })}
        </ScrollView>
        <NavigationArrows
          onNext={actions.goToNextSection}
          onPrev={actions.goToPrevSection}
          isFirst={state.currentSectionIndex === 0}
          isLast={state.currentSectionIndex === state.totalSections - 1}
        />
      </View>
    </View>
  );
}
