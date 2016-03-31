# ASNetworking
## ASNetworking介绍
ASNetworking目前是基于[AFNetworking](https://github.com/AFNetworking/AFNetworking)进行封装的iOS网络库，目的是实现一些更抽象更高层次的网络请求。其基本思想是把每一个网络请求都封装成一个对象,通过覆盖父类的一些方法来构造指定的网络请求。
## ASNetworking提供的功能
* 支持block模式回调方式(后期会加上delegate回调)。
* 支持网络请求 URL 的参数修改、替换、删除等操作。
* 支持批量cancel特定请求、以及单个请求。
* 支持参数自动组装。

## ASNetworking组成结构
* **ASURLConstants ASURLServerConfig**：设置URL。
* **ASAppConfig** ：用来设置一些基础参数 目前和业务相关。
* **ASErrorInterceptorHandler**：主要拦截错误，例如数据结构完整性、标准格式下error拦截等等。
* **ASBaseRequest**：所有的网络请求类需要继承于 **ASBaseRequest** 或者基于业务逻辑的类，如下的**ASBaseInfoRequest**
* **ASBaseRequest**提供一系列的**Category**来提供请求所需功能，例如属性组装、url编码等等操作。
* **ASBaseInfoRequest** 基于业务层封装类，继承**ASBaseRequest**
* **ASRequestManager**：管理所有**ASBaseRequest** 请求，包括当前状态、请求前的数据组装、错误拦截、物理连接错误等等。

## ASNetworking使用教程
**ASNetworking**具体的用法参考**ASAppStatisticsRequest**该类，下面有比较详细的使用过程。

### ASAppStatisticsRequest 实现过程
```objective-c
	#import "ASBaseInfoRequest.h"

	@interface ASAppStatisticsRequest : ASBaseInfoRequest
	
	@property(nonatomic,copy)NSString *statType;
	
	@end
	
	@implementation ASAppStatisticsRequest
	
	
	-(id)init
	{
	    self = [super init];
	    if (self) {
	        self.interfaceName = ASAppRequestStatisticsURL;
	        self.requestMethod = ASRequestMethodGet;
	    }
	    return self;
	}
	
	/**
	 *  解析数据结构  如果子类覆盖该方法、block回调就会返回此方法处理结果
	 *
	 *  @param respond 根据后台返回数据类型 json、xml、html等等
	 *  @param error   错误信息
	 *
	 *  @return 解析后的数据结构
	 */
	-(id)parseResponseObject:(id)respond error:(NSError *__autoreleasing *)error
	{
	    return respond;
	}
	@end
```

### ASAppStatisticsRequest调用方式
```objective-c
    ASAppStatisticsRequest *appRequest = [[ASAppStatisticsRequest alloc] initWithSender:self];
	    appRequest.statType = type;
	    [appRequest requestWithCompletionHandler:^(id response, NSError *error) {
	        if (error) {
	            D_Log(@"ASAppStatisticsRequest error = %@" , error);
	        }else{
	            D_Log(@"ASAppStatisticsRequest response = %@" , response);
	        }
	    }];
```