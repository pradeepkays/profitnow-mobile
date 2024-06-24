import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppBlock, appSize} from '@starlingtech/element';

import {color, font} from 'components/Styles';
import PickerNew from 'src/Component/PickerNew';
import {usePipelineTree} from 'src/service/contact/pipeline';
import useAppStore from 'src/store/appStore';
import {RespPipeline, Stage} from 'src/types/pipeline.types';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  status: RespPipeline | undefined;
  setStatus(p: RespPipeline): void;
  stage: Stage | undefined;
  setStage(p?: Stage): void;
};

export const PipelineFilter = (props: Props) => {
  const {status, setStatus, stage, setStage} = props;

  const {default_status_view, contact_section, organization_section} =
    useAppStore(s => s.userSetting);

  const showStage =
    (default_status_view === 'contact' && contact_section.show_stage) ||
    (default_status_view === 'company' && organization_section.show_stage);
  const showStatus =
    (default_status_view === 'contact' && contact_section.show_status) ||
    (default_status_view === 'company' && organization_section.show_status);

  const enabled = showStage || showStatus;

  const {data: filterOptions} = usePipelineTree(enabled);

  useEffect(() => {
    // console.log(
    //   'PipelineFilter useEffect filterOptions==>',
    //   JSON.stringify(filterOptions),
    // );
  }, []);

  const onStatusChanged = (p: RespPipeline) => {
    setStatus(p);
    setStage(undefined);
    // setStage(p.stages)
  };

  const onStageChanged = (p: Stage) => {
    setStage(p);
  };

  if (!enabled) {
    return <AppBlock height={10} />;
  }

  return (
    <View style={styles.dropDownContainer}>
      {showStatus && (
        <View style={{flex: 1, marginRight: 10}}>
          {/* <PickerNew
            placeholder="Opportunity"
            nameKey="title"
            idKey={'status'}
            data={filterOptions}
            value={status}
            onSelect={onStatusChanged}
            placeHolderTextStyle={styles.placeHolderTextStyle}
            dropDownStyle={{height: 40}}
          /> */}

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={filterOptions ?? []}
            maxHeight={300}
            labelField="title"
            valueField="status"
            placeholder="Opportunity"
            value={status}
            onChange={onStatusChanged}
          />
        </View>
      )}

      {showStage && (
        <View style={{flex: 1, marginLeft: 10}}>
          {/* <PickerNew
            placeholder="Select Stage"
            nameKey="title"
            idKey={'stage'}
            data={status?.stages || []}
            value={stage}
            onSelect={onStageChanged}
            placeHolderTextStyle={styles.placeHolderTextStyle}
            dropDownStyle={{height: 40}}
          /> */}

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={status?.stages || []}
            maxHeight={300}
            labelField="title"
            valueField="stage"
            placeholder="Select Stage"
            value={stage}
            onChange={onStageChanged}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    zIndex: 0,
  },
  placeholderStyle: {
    color: 'lightgrey',
    // fontFamily: font.reg,
    fontSize: 14,
  },
  selectedColor: {
    color: '#000',
    fontSize: 14,
  },
  dropDownContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 22,
    paddingHorizontal: appSize(15),
    width: '100%',
  },
  placeHolderTextStyle: {
    color: 'rgba(95, 100, 126, 0.87)',
    fontFamily: font.reg,
    fontSize: 14,
  },
});
