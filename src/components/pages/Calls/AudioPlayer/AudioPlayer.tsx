import { getRecord } from "api";
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";

import { Button, DownloadSVG, PauseSVG, PlaySVG } from "shared";
import { classNames } from "utils";

import classes from "./AudioPlayer.module.scss";

import type { IErrorResponse } from "types";

interface IAudioPlayerProps {
  className?: string;
  id: number;
  record: string;
  partnershipId: string;
  callDuration: string;
  getPlayAudioCallId: (value: number | null) => void;
}

export const AudioPlayer = ({
  className,
  id,
  record,
  partnershipId,
  callDuration,
  getPlayAudioCallId,
}: IAudioPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [play, setPlay] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const value = Number(event.target.value);
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const onPlay = () => {
    setPlay(true);
    getPlayAudioCallId(id);
  };

  const onPause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlay(false);
    getPlayAudioCallId(null);
  }, [getPlayAudioCallId]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);

      if (audioRef.current.currentTime === audioRef.current.duration) {
        setPlay(false);
        getPlayAudioCallId(null);
      }
    }
  };

  useEffect(() => {
    if (play && record) {
      getRecord({ record, partnership_id: partnershipId })
        .then((resp) => {
          const url = URL.createObjectURL(resp);
          setAudioUrl(url);
        })
        .catch((error: IErrorResponse) => {
          console.error(error.message, error.url);
          onPause();
        });
    }
  }, [record, partnershipId, play, onPause]);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [play]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  return (
    <div className={classNames(classes.audioPlayer, className)}>
      <span>{callDuration}</span>

      <Button
        className={classes.playButton}
        onClick={() => {
          if (!play) {
            onPlay();
          } else {
            onPause();
          }
        }}
      >
        {!play ? <PlaySVG color="var(--blue)" /> : <PauseSVG color="var(--blue)" />}
      </Button>

      <div className={classes.playerRange}>
        <div
          style={{ width: `${(currentTime / duration) * 100}%` }}
          className={classes.progress}
        ></div>
        <input
          className={classes.inputRange}
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
      </div>

      <audio ref={audioRef} src={audioUrl} />

      <Button>
        <DownloadSVG color="var(--trinity-blue)" />
      </Button>
    </div>
  );
};
