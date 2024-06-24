import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppText} from '@starlingtech/element';

import PickerNew from 'components/PickerNew';
import {usePipelineTree} from 'src/service/contact/pipeline';
import {RespPipeline, Stage} from 'src/types/pipeline.types';

import {color, font, shadow} from 'src/Component/Styles';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  statusVal: string | undefined;
  stageVal: string | undefined;
  status: RespPipeline | undefined;
  stage: Stage | undefined;
  setStatus(p?: RespPipeline): void;
  setStage(p?: Stage): void;
};

export function StageFilter(props: Props) {
  const {data} = usePipelineTree(true);

  const [status, setStatus] = useState(props.status);
  const [stage, setStage] = useState(props.stage);

  const onStatusChanged = (p: RespPipeline) => {
    props.setStatus(p);
    props.setStage(undefined);
  };
  const onStageChanged = (p: Stage) => {
    props.setStage(p);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  useEffect(() => {
    setStage(props.stage);
  }, [props.stage]);

  useEffect(() => {
    if (data) {
      const tmp = data.find(
        x => x.title.toLowerCase() === props.statusVal?.toLowerCase(),
      );
      setStatus(tmp);
      if (tmp) {
        const tmpStage = tmp.stages.find(
          x => x.title.toLowerCase() === props.stageVal?.toLowerCase(),
        );
        setStage(tmpStage);
        // setStage(tmp?.stages)
      } else {
        setStage(undefined);
      }
    }
  }, [props.statusVal, props.stageVal, data]);

  return (
    <>
      <View style={{marginBottom: 15}}>
        <AppText size={13} style={styles.label}>
          Status
        </AppText>
        <View style={{flex: 1}}>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={data ?? []}
            maxHeight={300}
            labelField="title"
            valueField="status"
            placeholder="Status"
            value={status}
            onChange={onStatusChanged}
          />

          {/* <PickerNew
            placeholder="Status"
            data={data}
            nameKey="title"
            idKey="status"
            value={status}
            onSelect={onStatusChanged}
          /> */}
        </View>
      </View>

      <View style={{marginBottom: 15}}>
        <AppText size={13} style={styles.label}>
          Stage
        </AppText>
        <View style={{flex: 1}}>
          {/* <PickerNew
            placeholder="Stage"
            data={status?.stages}
            value={stage}
            nameKey="title"
            idKey="stage"
            onSelect={onStageChanged}
          /> */}

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={status?.stages ?? []}
            maxHeight={300}
            labelField="title"
            valueField="stage"
            placeholder="Stage"
            value={stage}
            onChange={onStageChanged}
          />
        </View>
      </View>
    </>
  );
}

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
  label: {
    color: '#7E8EAA',
    flex: 1,
    marginBottom: 5,
  },
});
