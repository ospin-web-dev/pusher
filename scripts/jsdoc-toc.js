(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"pusher.html\">pusher</a>","id":"pusher","children":[{"label":"<a href=\"pusher.DeviceMaintenancePusherChannel.html\">DeviceMaintenancePusherChannel</a>","id":"pusher.DeviceMaintenancePusherChannel","children":[]},{"label":"<a href=\"pusher.DeviceProcessPusherChannel.html\">DeviceProcessPusherChannel</a>","id":"pusher.DeviceProcessPusherChannel","children":[]},{"label":"<a href=\"pusher.DeviceProcessStreamingDataPusherChannel.html\">DeviceProcessStreamingDataPusherChannel</a>","id":"pusher.DeviceProcessStreamingDataPusherChannel","children":[]},{"label":"<a href=\"pusher.DeviceProcessesPusherChannel.html\">DeviceProcessesPusherChannel</a>","id":"pusher.DeviceProcessesPusherChannel","children":[]},{"label":"<a href=\"pusher.DevicePusherChannel.html\">DevicePusherChannel</a>","id":"pusher.DevicePusherChannel","children":[]},{"label":"<a href=\"pusher.OspinPusherClient.html\">OspinPusherClient</a>","id":"pusher.OspinPusherClient","children":[]}]}],
        openedIcon: ' &#x21e3;',
        saveState: false,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);
