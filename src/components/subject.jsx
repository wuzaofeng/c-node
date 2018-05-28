import React, { Component } from 'react';
import { Button, Select, Input  } from 'antd';
import Editor from '../components/editor/editor';
import * as tools from '../js/tools';
const Option = Select.Option;

export default class Subject extends Component {
  state = {
    currentSelect: '',
    currentInput: '',
    currentText: '',
  };

  changeHandle = (value) => {
    this.setState({
      currentText: value,
    });
  }

  selectOption = [{
    title: '请选择',
    value: '',
  }, {
    title: '分享',
    value: 'share',
  }, {
    title: '问答',
    value: 'ask',
  }, {
    title: '招聘',
    value: 'job',
  }, {
    title: '客户端测试',
    value: 'dev',
  }]

  handleSelect = (i) => {
    this.setState({
      currentSelect: this.selectOption[i].value,
    });
  }

  inputChange = (e) => {
    const val = e.target.value;
    this.setState({
      currentInput: val,
    });
  }

  submitHandle = () => {
    const { currentSelect,currentInput,currentText } = this.state;
    this.props.onClickHandle({
      currentSelect,
      currentInput,
      currentText,
    });
  }

  componentWillMount() {
    const { tab, name, text } = this.props;
    this.setState({
      currentSelect: tab,
      currentInput: name,
      currentText: text,
    });
  }

  render () {
    const { tab, name, text } = this.props;
    const defaultVal = this.selectOption.filter((item) => {
      if (item.value === tab){
        return item
      }
    })
    return (
      <form>
        <div>
          <span>选择版块：</span>
          <Select name="tab" defaultValue={defaultVal[0].title} style={{ width: '100%' }} onChange={this.handleSelect}>
            {
              this.selectOption.map((item, i) => {
                return (<Option key={item.value} value={i}>{item.title}</Option>)
              })
            }
          </Select>
        </div>
        <div>
          <span>标题：</span>
          <Input name="name" defaultValue={name} onChange={(e) => {this.inputChange(e)}} />
        </div>
        <Editor text={tools.escape2Html(this.state.currentText)} changeHandle={(value) => { this.changeHandle(value); }} />
        <Button onClick={this.submitHandle}>提交</Button>
      </form>
    );
  }
}
