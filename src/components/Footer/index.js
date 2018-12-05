import React,{Component} from "react";
import './footer.scss'

class Footer extends Component{
	
	render(){
		return <div id="Footer">
			<div className = 'footer-layer'>
				<p>Copyright © {2018} 花卷</p>
				<p>京ICP备16023684号-1</p>
				<p>北京花卷儿科技有限公司 地址：北京市海淀区地锦路7号院14号楼2层201 电话：57610646</p>
			</div>
		</div>
	}
}


export default Footer;