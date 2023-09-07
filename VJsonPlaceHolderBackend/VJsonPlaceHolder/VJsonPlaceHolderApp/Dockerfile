#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0.0-preview.2-jammy AS base
WORKDIR /app

#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ENV \
    # Do not generate certificate
    DOTNET_GENERATE_ASPNET_CERTIFICATE=false \
    # Do not show first run text
    DOTNET_NOLOGO=true \
    # SDK version
    DOTNET_SDK_VERSION=8.0.100-preview.2.23157.25 \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip \
    # PowerShell telemetry for docker image usage
    POWERSHELL_DISTRIBUTION_CHANNEL=PSDocker-DotnetSDK-Ubuntu-22.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    curl \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install .NET SDK
RUN curl -fSL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='97302c3600af7787fb136b226ca7e2a0a22241aa93dcffc70010b475bf6f8c4ff74a363d94949e1b64a91032b57a58a7065d7c6b2177696d8e78504ef4f1280f' \
    && echo "$dotnet_sha512  dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -oxzf dotnet.tar.gz -C /usr/share/dotnet ./packs ./sdk ./sdk-manifests ./templates ./LICENSE.txt ./ThirdPartyNotices.txt \
    && rm dotnet.tar.gz \
    # Trigger first run experience by running arbitrary cmd
    && dotnet help

WORKDIR /src
COPY ["Services/Comment/VJsonPlaceHolder/VJsonPlaceHolder/VJsonPlaceHolder.csproj", "Services/Comment/VJsonPlaceHolder/VJsonPlaceHolder/"]
COPY ["Services/Comment/VJsonPlaceHolder/Contracts/Contracts.csproj", "Services/Comment/VJsonPlaceHolder/Contracts/"]
COPY ["Services/Comment/VJsonPlaceHolder/Entities/Entities.csproj", "Services/Comment/VJsonPlaceHolder/Entities/"]
COPY ["Services/Comment/VJsonPlaceHolder/VJsonPlaceHolder/Config/gra372-efd5f3dc4210.json", "Services/Comment/VJsonPlaceHolder/VJsonPlaceHolder/Config/"]
COPY ["Services/Comment/VJsonPlaceHolder/LoggerService/LoggerService.csproj", "Services/Comment/VJsonPlaceHolder/LoggerService/"]
COPY ["Services/Comment/VJsonPlaceHolder/Repository/Repository.csproj", "Services/Comment/VJsonPlaceHolder/Repository/"]
COPY ["Services/Comment/VJsonPlaceHolder/Hosts/Hosts.csproj", "Services/Comment/VJsonPlaceHolder/Hosts/"]

RUN dotnet restore "Services/Comment/VJsonPlaceHolder/VJsonPlaceHolder/VJsonPlaceHolder.csproj"
COPY . .
WORKDIR "/src/Services/Comment/VJsonPlaceHolder/VJsonPlaceHolder"
RUN dotnet build "VJsonPlaceHolder.csproj" -c Release -o /app/build

#FROM build AS publish
RUN dotnet publish "VJsonPlaceHolder.csproj" -c Release -o /app/publish
WORKDIR /app/publish
ENV ASPNETCORE_URLS=http://+:80/
EXPOSE 80
CMD ["./VJsonPlaceHolder"]

#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#RUN apt update && apt install -y libc-dev
#ENTRYPOINT ["dotnet", "VJsonPlaceHolder.dll"]