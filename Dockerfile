FROM node:20-bookworm-slim

ENV NEXTJS_USER=next
ENV NEXTJS_USER_UID=2023
ENV NEXTJS_INSTALL_DIR=/build
ENV UV_USE_IO_URING=0
ENV USER_BACKEND=

RUN groupadd --gid ${NEXTJS_USER_UID} ${NEXTJS_USER} \
    && useradd --uid ${NEXTJS_USER_UID} --gid ${NEXTJS_USER_UID} \
    --home-dir ${NEXTJS_INSTALL_DIR} --shell /bin/bash ${NEXTJS_USER}

USER ${NEXTJS_USER}

WORKDIR ${NEXTJS_INSTALL_DIR}

COPY --chown=${NEXTJS_USER}:${NEXTJS_USER} package.json ${NEXTJS_INSTALL_DIR}/.
COPY --chown=${NEXTJS_USER}:${NEXTJS_USER} package-lock.json ${NEXTJS_INSTALL_DIR}/.

RUN npm install

COPY . ${NEXTJS_INSTALL_DIR}/.

ENTRYPOINT [ "./entrypoint.sh" ]

EXPOSE 3000

CMD ["npm", "run", "start"]
