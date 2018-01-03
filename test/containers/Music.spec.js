import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Music } from 'containers/Music';

const mockDispatch = jest.fn();
jest.useFakeTimers();

const props = {
  dispatch: mockDispatch,
  jane: {
    username: '',
    name: '',
    music: []
  },
};
const loadedProps = {
  dispatch: mockDispatch,
   jane: {
     username: "jane",
     name: "Jane Doe",
     music: [
       {
         "title": "Track One",
         "file": '414365__erokia__ambient-wave-28.wav'
       },
       {
         "title": "Track Two",
         "file": "414497__toiletrolltube__hellocatfood-b6b7-o.wav"
       },
       {
         'title': "Track Three",
         "file": '414514__eardeer__daybreak.wav'
       }
     ]
   },
 };

function setup(ownProps = props) {
  return shallow(
    <Music { ...ownProps } />,
    { attachTo: document.getElementById('react') }
  );
}

describe('Music', () => {
  it('should be a Component', () => {
    const wrapper = setup();
    expect( wrapper.instance() instanceof React.Component ).toBe(true);
  });

  it('should render properly', () => {
    const wrapper = setup();
    expect( wrapper.find('.music_app') ).toBePresent();
  });

  it('should render a Loader without data', () => {
    const wrapper = setup();
    expect(wrapper.find('Loader')).toBePresent();
  });

  it('should have dispatched an action on mount', () => {
    const wrapper = setup()
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      payload: {},
      type: 'GET_JANE_REQUEST',
    });
  });

  it('should render some items when data arrives', () => {
   const wrapper = setup(loadedProps);
    expect(wrapper.find('.card')).toBeTruthy();
  });
  it('should render the Music Player with correct data', () => {
   const wrapper = setup(loadedProps);
   expect(wrapper.find('.audioControls')).toBeTruthy();
    expect(wrapper.find('.leftbtn')).toBeTruthy();
    expect(wrapper.find('.rightbtn')).toBeTruthy();
    expect(wrapper.find('.midbtn')).toBeTruthy();
  });
  describe('Music Player Controls', () => {
    it('Should auto play first track', () => {
     const wrapper = setup(loadedProps);
      expect(wrapper.instance().state.playing).toBe(true);
    });
    it('First Play/Pause click should pause the first track', () => {
     const wrapper = setup(loadedProps);
     const mockPlay = jest.fn();
     const mockPause = jest.fn();
     wrapper.instance().wavesurfer = global.wavesurfer;
     wrapper.instance().wavesurfer.play = mockPlay;
     wrapper.instance().wavesurfer.pause = mockPause;
     wrapper.find('.leftbtn').simulate('click', { target: {
        value: 'ClickPlay' }
      });
      expect(wrapper.instance().state.playing).toBe(false);
    });
    it('Playlist item click should load the correct track', () => {
     const wrapper = setup(loadedProps);
     const mockPlay = jest.fn();
     const mockLoad = jest.fn();
     const mockOn = jest.fn();
     const mockCallback = jest.fn();
     wrapper.instance().wavesurfer = global.wavesurfer;
     wrapper.instance().wavesurfer.play = mockPlay;
     wrapper.instance().wavesurfer.load = mockLoad;
     wrapper.instance().wavesurfer.on = mockOn;
     wrapper.find('#audio_track_1').simulate('click', { currentTarget: {
        value: 'ClickPlay', dataset:{track:"414497__toiletrolltube__hellocatfood-b6b7-o.wav"} }, preventDefault:function(){}
      });
      expect(mockLoad.mock.calls[0][0]).toBe("http://du8bvvbrz11r7.cloudfront.net/414497__toiletrolltube__hellocatfood-b6b7-o.wav");
    });
    it('Stop click should stop playback', () => {
     const wrapper = setup(loadedProps);
     const mockStop = jest.fn();
     const mockPause = jest.fn();
     wrapper.instance().wavesurfer = global.wavesurfer;
     wrapper.instance().wavesurfer.stop = mockStop;
     wrapper.instance().wavesurfer.pause = mockPause;
     wrapper.find('.stopbtn').simulate('click', { target: {
        value: 'ClickStop' }
      });
      expect(mockStop.mock.calls.length).toBe(1);
      expect(wrapper.instance().state.playing).toBe(false);
    });
    it('FF Press should create a SetInterval call with 100ms timer', () => {
     const wrapper = setup(loadedProps);
     const mockForwardRewind = jest.fn();
     const mockPause = jest.fn();

      wrapper.instance().wavesurfer = global.wavesurfer;
      wrapper.instance().forwardAndBack = mockForwardRewind;
      wrapper.instance().pressForward();
      expect(setInterval).toHaveBeenCalledTimes(1);
    });
  });
});
