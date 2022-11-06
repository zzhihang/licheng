FROM registry.cn-beijing.aliyuncs.com/llen/base-vue-cmi:latest
ADD dist /www/dist
RUN chown -R www.www /www
CMD /start.sh