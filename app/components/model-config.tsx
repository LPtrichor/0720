import {
  ModalConfigValidator,
  ModelConfig,
  useAccessStore,
  useAppConfig,
} from "../store";

import Locale from "../locales";
import { InputRange } from "./input-range";
import { List, ListItem, PasswordInput, Select } from "./ui-lib";

export function ModelConfigList(props: {
  modelConfig: ModelConfig;
  updateConfig: (updater: (config: ModelConfig) => void) => void;
}) {
  const config = useAppConfig();
  const accessStore = useAccessStore();
  return (
    <>
      {/* <List>
        <ListItem
          title={Locale.Settings.Endpoint.Title}
          subTitle={Locale.Settings.Endpoint.SubTitle}
        >
          <input
            type="text"
            value={props.modelConfig.api_url}
            placeholder="https://api.openai.com/"
            onChange={(e) =>
              props.updateConfig(
                (config) =>
                (config.api_url =
                  e.currentTarget.value
                  // accessStore.updateOpenAiUrl(e.currentTarget.value)
                ),
              )
            }
          ></input>
        </ListItem>
        <ListItem
          title={Locale.Settings.Token.Title}
          subTitle={Locale.Settings.Token.SubTitle}
        >
          <PasswordInput
            value={props.modelConfig.api_key}
            type="text"
            placeholder={Locale.Settings.Token.Placeholder}
            onChange={(e) =>
              props.updateConfig(
                (config) =>
                (config.api_key =
                  e.currentTarget.value
                  // accessStore.updateToken(e.currentTarget.value)
                ),
              )
            }
          />
        </ListItem>
      </List> */}
      <List>

        <ListItem title={Locale.Settings.Model}>
          <Select
            value={props.modelConfig.model}
            onChange={(e) => {
              props.updateConfig(
                (config) =>
                (config.model = ModalConfigValidator.model(
                  e.currentTarget.value,
                )),
              );
            }}
          >
            {config.allModels().map((v, i) => (
              <option value={v.name} key={i} disabled={!v.available}>
                {v.name}
              </option>
            ))}
          </Select>
        </ListItem>

        <ListItem
          title={Locale.Settings.Temperature.Title}
          subTitle={Locale.Settings.Temperature.SubTitle}
        >
          <InputRange
            value={props.modelConfig.temperature?.toFixed(1)}
            min="0"
            max="1" // lets limit it to 0-1
            step="0.1"
            onChange={(e) => {
              props.updateConfig(
                (config) =>
                (config.temperature = ModalConfigValidator.temperature(
                  e.currentTarget.valueAsNumber,
                )),
              );
            }}
          ></InputRange>
        </ListItem>
        <ListItem
          title={Locale.Settings.TopP.Title}
          subTitle={Locale.Settings.TopP.SubTitle}
        >
          <InputRange
            value={(props.modelConfig.top_p ?? 1).toFixed(1)}
            min="0"
            max="1"
            step="0.1"
            onChange={(e) => {
              props.updateConfig(
                (config) =>
                (config.top_p = ModalConfigValidator.top_p(
                  e.currentTarget.valueAsNumber,
                )),
              );
            }}
          ></InputRange>
        </ListItem>
        <ListItem
          title={Locale.Settings.MaxTokens.Title}
          subTitle={Locale.Settings.MaxTokens.SubTitle}
        >
          <input
            type="number"
            min={100}
            max={32000}
            value={props.modelConfig.max_tokens}
            onChange={(e) =>
              props.updateConfig(
                (config) =>
                (config.max_tokens = ModalConfigValidator.max_tokens(
                  e.currentTarget.valueAsNumber,
                )),
              )
            }
          ></input>
        </ListItem>
        <ListItem
          title={Locale.Settings.PresencePenalty.Title}
          subTitle={Locale.Settings.PresencePenalty.SubTitle}
        >
          <InputRange
            value={props.modelConfig.presence_penalty?.toFixed(1)}
            min="-2"
            max="2"
            step="0.1"
            onChange={(e) => {
              props.updateConfig(
                (config) =>
                (config.presence_penalty =
                  ModalConfigValidator.presence_penalty(
                    e.currentTarget.valueAsNumber,
                  )),
              );
            }}
          ></InputRange>
        </ListItem>

        <ListItem
          title={Locale.Settings.FrequencyPenalty.Title}
          subTitle={Locale.Settings.FrequencyPenalty.SubTitle}
        >
          <InputRange
            value={props.modelConfig.frequency_penalty?.toFixed(1)}
            min="-2"
            max="2"
            step="0.1"
            onChange={(e) => {
              props.updateConfig(
                (config) =>
                (config.frequency_penalty =
                  ModalConfigValidator.frequency_penalty(
                    e.currentTarget.valueAsNumber,
                  )),
              );
            }}
          ></InputRange>
        </ListItem>

        <ListItem
          title={Locale.Settings.InputTemplate.Title}
          subTitle={Locale.Settings.InputTemplate.SubTitle}
        >
          <input
            type="text"
            value={props.modelConfig.template}
            onChange={(e) =>
              props.updateConfig(
                (config) => (config.template = e.currentTarget.value),
              )
            }
          ></input>
        </ListItem>

        <ListItem
          title={Locale.Settings.HistoryCount.Title}
          subTitle={Locale.Settings.HistoryCount.SubTitle}
        >
          <InputRange
            title={props.modelConfig.historyMessageCount.toString()}
            value={props.modelConfig.historyMessageCount}
            min="0"
            max="32"
            step="1"
            onChange={(e) =>
              props.updateConfig(
                (config) => (config.historyMessageCount = e.target.valueAsNumber),
              )
            }
          ></InputRange>
        </ListItem>

        <ListItem
          title={Locale.Settings.CompressThreshold.Title}
          subTitle={Locale.Settings.CompressThreshold.SubTitle}
        >
          <input
            type="number"
            min={500}
            max={4000}
            value={props.modelConfig.compressMessageLengthThreshold}
            onChange={(e) =>
              props.updateConfig(
                (config) =>
                (config.compressMessageLengthThreshold =
                  e.currentTarget.valueAsNumber),
              )
            }
          ></input>
        </ListItem>
        <ListItem title={Locale.Memory.Title} subTitle={Locale.Memory.Send}>
          <input
            type="checkbox"
            checked={props.modelConfig.sendMemory}
            onChange={(e) =>
              props.updateConfig(
                (config) => (config.sendMemory = e.currentTarget.checked),
              )
            }
          ></input>
        </ListItem>
      </List>
    </>
  );
}
