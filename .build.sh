CLIENT=$(cat ./dockerconfig.json | grep clientTag | awk -F: '{ print $2 }' | sed 's/[\",]//g' | awk '{$1=$1};1')
NAME=$(cat ./dockerconfig.json | grep imageName | awk -F: '{ print $2 }' | sed 's/[\",]//g' | awk '{$1=$1};1')
VERSION=$(cat ./package.json | grep version | awk -F: '{ print $2 }' | sed 's/[\",]//g' | awk '{$1=$1};1')

REGISTRY_dev=$(cat ./dockerconfig.json | grep registry_dev | awk -F: '{ print $2 }' | sed 's/[\",]//g' | awk '{$1=$1};1')
REGISTRY_stage=$(cat ./dockerconfig.json | grep registry_stage | awk -F: '{ print $2 }' | sed 's/[\",]//g' | awk '{$1=$1};1')
REGISTRY_live=$(cat ./dockerconfig.json | grep registry_live | awk -F: '{ print $2 }' | sed 's/[\",]//g' | awk '{$1=$1};1')

if [[ -z CLIENT ]]
  then
    echo "You need to set a CLIENT_TAG env variable or a clientTag package.json param"
    return
fi

if [ $# -eq 0 ]
  then
    export NODE_ENV=dev
else 
    export NODE_ENV=$1
fi

echo "Environment: $NODE_ENV"

if [ "$NODE_ENV" == "live" ]
  then
    REGISTRY=$REGISTRY_live
elif [ "$NODE_ENV" == "stage" ]
  then
    REGISTRY=$REGISTRY_stage
else 
    REGISTRY=$REGISTRY_dev
fi
VERSION=${VERSION}-${NODE_ENV}
IMAGE=${REGISTRY}/${CLIENT}/${NAME}:v${VERSION}
LATEST=${REGISTRY}/${CLIENT}/${NAME}:latest

echo "Building $IMAGE"

docker build . -t $IMAGE -t $LATEST
docker push $IMAGE

echo "Pushed $IMAGE"